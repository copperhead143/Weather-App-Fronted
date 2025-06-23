export const formatDate = (dateString: string, locale: string = 'en'): string => { //formatowanie daty wg danego locale
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, { //14.03.2025
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

export const formatShortDate = (dateString: string, locale: string = 'en'): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, { //Mon 14 Mar
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    })

}