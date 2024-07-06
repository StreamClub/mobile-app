export const formatScore = (score: number) => {
    if (score == null) {
        return '0/10'
    }
    return score.toString() + '/10'
}