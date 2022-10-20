// edits Error message state and Times it out for N mili-seconds
export const editErrorMessage = (set, time, error) => {
    set(error)
    return (
      setTimeout(() => {
        set(null)
      }, time)
    )
}

