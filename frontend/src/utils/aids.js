

export function sortApiAscending(){
    return (a, b) => ((a.position - b.position) || (a.id - b.id))
 }