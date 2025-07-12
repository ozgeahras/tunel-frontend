'use client';

import { useState, useRef, useEffect } from 'react';

interface SearchDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  suggestions: string[];
  className?: string;
  onEnterSubmit?: () => void;
}

export default function SearchDropdown({ 
  value, 
  onChange, 
  placeholder, 
  suggestions, 
  className = '',
  onEnterSubmit
}: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // SearchDropdown component

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(suggestions[highlightedIndex]);
        } else if (onEnterSubmit && value.trim()) {
          // If no suggestion is highlighted but there's a value, trigger search
          setIsOpen(false);
          onEnterSubmit();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Simple immediate check without useEffect
    if (newValue.length >= 2 && suggestions.length > 0) {
      setIsOpen(true);
      setHighlightedIndex(-1);
    } else {
      setIsOpen(false);
    }
  };

  // Handle dropdown visibility in input handlers instead of useEffect

  const handleSelect = (suggestion: string) => {
    console.log('SearchDropdown - handleSelect called with:', suggestion);
    onChange(suggestion);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleFocus = () => {
    // Check current value and suggestions when focused
    if (value.length >= 2 && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
        data-component="SearchDropdown"
      />
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-[var(--card-background)] border border-[var(--border-color)] rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                index === highlightedIndex
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                  : 'text-[var(--text-primary)] hover:bg-[var(--border-color)]/50'
              }`}
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}