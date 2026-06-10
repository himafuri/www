import { useEffect, type EffectCallback } from 'react'

/**
 * Runs an effect only when the component mounts, and cleans it up on unmount.
 *
 * Use this only for mount-bound interop with non-React APIs that do their own
 * lifecycle management, such as imperative widgets, subscriptions, or browser
 * APIs that cannot be represented by render state or a dedicated library.
 */
function useMountEffect(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- This wrapper intentionally models mount/unmount lifecycle only.
  useEffect(effect, [])
}

export default useMountEffect
