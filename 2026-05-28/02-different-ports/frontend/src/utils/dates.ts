// import { useState } from "react"

export function displayDate(date: string): string {

    // an example of an attempt to use an hook not from a component or from another hook
    // const [something, setSomehting ] = useState<string>('')
    return (new Date(date)).toLocaleDateString()
}