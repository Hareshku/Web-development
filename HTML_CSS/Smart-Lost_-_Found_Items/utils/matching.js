/**
 * Calculate similarity score between two strings
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Similarity score (0-1)
 */
function calculateStringSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;

  // Convert to lowercase
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  // Check for exact match
  if (s1 === s2) return 1;

  // Check if one contains the other
  if (s1.includes(s2) || s2.includes(s1)) {
    return 0.8;
  }

  // Split into words and check for common words
  const words1 = s1.split(/\s+/).filter(word => word.length > 3);
  const words2 = s2.split(/\s+/).filter(word => word.length > 3);

  if (words1.length === 0 || words2.length === 0) return 0;

  const commonWords = words1.filter(word => words2.includes(word));

  return commonWords.length / Math.max(words1.length, words2.length);
}

/**
 * Calculate match score between two reports
 * @param {Object} report1 - First report
 * @param {Object} report2 - Second report
 * @returns {Object} - Match score details including raw score and percentage
 */
function calculateMatchScore(report1, report2) {
  let score = 0;

  // Item name similarity (highest weight)
  const nameSimilarity = calculateStringSimilarity(report1.itemName, report2.itemName);
  score += nameSimilarity * 5;

  // Category match
  if (report1.category === report2.category) {
    score += 2;
  }

  // Location similarity
  const locationSimilarity = calculateStringSimilarity(report1.location, report2.location);
  score += locationSimilarity * 3;

  // Description similarity
  const descriptionSimilarity = calculateStringSimilarity(report1.description, report2.description);
  score += descriptionSimilarity * 2;

  // Date proximity (if within 7 days, add points)
  const date1 = new Date(report1.date);
  const date2 = new Date(report2.date);
  const daysDifference = Math.abs((date1 - date2) / (1000 * 60 * 60 * 24));

  if (daysDifference <= 7) {
    score += (7 - daysDifference) / 7; // More points for closer dates
  }

  // Calculate maximum possible score
  // Max name similarity: 5 (perfect match)
  // Max category match: 2 (exact match)
  // Max location similarity: 3 (perfect match)
  // Max description similarity: 2 (perfect match)
  // Max date proximity: 1 (same day)
  const maxPossibleScore = 5 + 2 + 3 + 2 + 1; // 13

  // Calculate percentage match (0-100)
  const percentageMatch = Math.round((score / maxPossibleScore) * 100);

  return {
    rawScore: score,
    percentage: percentageMatch,
    maxPossibleScore: maxPossibleScore
  };
}

/**
 * Find potential matches for a report
 * @param {Object} report - The report to find matches for
 * @param {Array} allReports - All reports to search through
 * @param {number} [minPercentage=50] - Minimum percentage match to include (0-100)
 * @returns {Array} - Sorted array of potential matches with scores
 */
function findPotentialMatches(report, allReports, minPercentage = 50) {
  // Only match with reports of opposite type
  const oppositeType = report.type === 'lost' ? 'found' : 'lost';

  // Filter reports of opposite type and active status
  const potentialMatches = allReports.filter(r =>
    r.type === oppositeType &&
    r.status === 'active' &&
    r.id !== report.id
  );

  // Calculate match score for each potential match
  const scoredMatches = potentialMatches.map(match => {
    const scoreDetails = calculateMatchScore(report, match);

    return {
      ...match,
      matchScore: scoreDetails.rawScore,
      matchPercentage: scoreDetails.percentage
    };
  });

  // Sort by match percentage (descending)
  scoredMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Return matches with percentage above the minimum threshold
  return scoredMatches.filter(match => match.matchPercentage >= minPercentage);
}

module.exports = {
  calculateStringSimilarity,
  calculateMatchScore,
  findPotentialMatches
};
