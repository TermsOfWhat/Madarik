/**
 * Tokenizes a string into an array of words
 */
export function tokenize(text: string): string[] {
    if (!text) return []
    return text.toLowerCase().split(/\s+/).filter(Boolean)
  }
  
  /**
   * Checks if a search term matches text using a more flexible algorithm
   * that can match partial words and tokenized terms
   */
  export function matchesSearch(text: string, searchTerm: string): boolean {
    if (!searchTerm) return true
    if (!text) return false
  
    const normalizedText = text.toLowerCase()
    const normalizedSearchTerm = searchTerm.toLowerCase()
  
    // Direct substring match (case insensitive)
    if (normalizedText.includes(normalizedSearchTerm)) {
      return true
    }
  
    // Tokenize both the text and search term
    const textTokens = tokenize(text)
    const searchTokens = tokenize(searchTerm)
  
    // Check if any search token is a substring of any text token
    return searchTokens.some((searchToken) =>
      textTokens.some((textToken) => textToken.includes(searchToken) || searchToken.includes(textToken)),
    )
  }
  
  /**
   * Filters an array of items based on a search term
   * @param items Array of items to filter
   * @param searchTerm Search term to filter by
   * @param getSearchableText Function to extract searchable text from an item
   * @returns Filtered array of items
   */
  export function filterBySearch<T>(items: T[], searchTerm: string, getSearchableText: (item: T) => string): T[] {
    if (!searchTerm) return items
  
    return items.filter((item) => matchesSearch(getSearchableText(item), searchTerm))
  }
  
  