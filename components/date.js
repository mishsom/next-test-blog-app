import { parseISO, format } from 'date-fns';

export default function ({dateString}) {
    const dateIso = parseISO(dateString);
    return (
        <time dateTime={dateString}>{format(dateIso, 'LLLL, d, yyyy')}</time>
    )
}
