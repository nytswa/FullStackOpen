// edits Error message state and Times it out for N mili-seconds
export const editErrorMessage = (set, time, message) => {
    set(message)
    return (
      setTimeout(() => {
        set(null)
      }, time)
    )
}

