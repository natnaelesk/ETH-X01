import { useEffect, useReducer, useRef } from 'react'

export function useMockResource(loader, deps = []) {
  const loaderRef = useRef(loader)
  const [state, dispatch] = useReducer(
    (current, action) => {
      switch (action.type) {
        case 'loading':
          return { ...current, loading: true, error: null }
        case 'success':
          return { data: action.payload, loading: false, error: null }
        case 'error':
          return { ...current, loading: false, error: action.payload }
        default:
          return current
      }
    },
    { data: null, loading: true, error: null },
  )

  useEffect(() => {
    loaderRef.current = loader
  }, [loader])

  useEffect(() => {
    let active = true

    dispatch({ type: 'loading' })

    Promise.resolve()
      .then(() => loaderRef.current())
      .then((result) => {
        if (active) {
          dispatch({ type: 'success', payload: result })
        }
      })
      .catch((err) => {
        if (active) {
          dispatch({ type: 'error', payload: err })
        }
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
