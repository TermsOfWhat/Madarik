"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import "./enhanced-search.scss"

interface EnhancedSearchProps {
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  className?: string
}

export function EnhancedSearch({ placeholder = "Search...", onChange, value, className }: EnhancedSearchProps) {
  const [searchValue, setSearchValue] = useState(value || "")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value !== undefined) {
      setSearchValue(value)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    onChange(e)
  }

  const handleClear = () => {
    setSearchValue("")
    if (inputRef.current) {
      inputRef.current.value = ""
      const event = new Event("input", { bubbles: true })
      inputRef.current.dispatchEvent(event)

      // Create a synthetic React change event
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>

      onChange(syntheticEvent)
      inputRef.current.focus()
    }
  }

  return (
    <div className={`enhanced-search ${className || ""}`}>
      <div className="search-input-container">
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          className="search-input"
        />
        {searchValue && (
          <button type="button" onClick={handleClear} className="clear-button" aria-label="Clear search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

