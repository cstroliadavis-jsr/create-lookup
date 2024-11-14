/**
 * @module @cstroliadavis/create-lookup
 * @author Chris Strolia-Davis<web.dev@strolia-davis.us>
 * @copyright 2024
 * @licence [MIT]{@link ./LICENSE}
 * @version 0.1.0
 */

/**
 * Represents a key type that can be used in a lookup operation.
 * Acceptable types include `string`, `number`, or `symbol`.
 */
export type LookupKey = string | number | symbol;

/**
 * Defines the possible values in a `LookupMap`. Each value can be either:
 * - A direct value of type `T`, or
 * - A function that returns type `T`.
 */
export type LookupValue<T> = (() => T) | T | undefined;

/**
 * A map type used for creating lookups. Maps each key (of type `T`)
 * to a value (or a function returning a value) of type `R`.
 *
 * @template T The type of keys, constrained by `LookupKey`.
 * @template R The type of values returned from the lookup.
 */
export type LookupMap<T extends LookupKey, R> = Record<T, LookupValue<R>>;

/**
 * Creates a lookup function based on a provided map. The function
 * retrieves a value from the map, evaluating it if it’s a function,
 * or returning it directly if it’s a simple value.
 *
 * @example
 *
 * Example Usage:
 * ```typescript
 * import { expect } from "jsr:@std/expect";
 *
 * enum ConfigKeys { MaxRetries = "maxRetries", Timeout = "timeout" }
 *
 * const configLookup = createLookup<ConfigKeys, number>({
 *   [ConfigKeys.MaxRetries]: 5,
 *   [ConfigKeys.Timeout]: () => 3000
 * });
 *
 * expect(configLookup(ConfigKeys.MaxRetries)).toBe(5);
 * expect(configLookup(ConfigKeys.Timeout)).toBe(3000);
 * ```
 *
 * @param lookupData A map associating keys of type `T` with values of type `R` (or functions returning `R`).
 * @returns {(key: T) => R | undefined} A function that takes a key of type `T` and returns a resolved value of type `R` or `undefined` if the key is not in the map.
 * @template T The key type constrained by `LookupKey`.
 * @template R The return type of the resolved values.
 */
export function createLookup<T extends LookupKey, R>(
  lookupData: LookupMap<T, R>,
): (key: T) => R | undefined {
  const lookup = new Map<LookupKey, LookupValue<R>>(Object.entries(lookupData));

  return (key: T) => {
    const lookupValue = lookup.get(key);

    return typeof lookupValue === "function"
      ? (lookupValue as () => R)()
      : lookupValue;
  };
}
