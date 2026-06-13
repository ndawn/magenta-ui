import dayjs from "dayjs"

import type { Entity } from "@/types"

export const getDate = (date: string) => dayjs(date).format("DD.MM.YYYY")

export const createFullEntity = <T extends Entity>(
  partial: Omit<T, keyof Entity>,
) =>
  ({
    ...partial,
    createdAt: dayjs().toISOString(),
    updatedAt: null,
    deletedAt: null,
  }) as T

export const readLocalStorageValue = <T extends any = unknown>(
  key: string,
  defaultValue?: T,
  deserialize = JSON.parse,
): T | null => {
  const storageValue = localStorage.getItem(key)

  if (storageValue === null) {
    return defaultValue ?? null
  }

  try {
    return deserialize(storageValue)
  } catch (error) {
    console.warn(error)
    return null
  }
}

export const writeLocalStorageValue = <T extends any = unknown>(
  key: string,
  value: T | null | undefined,
  serialize = JSON.stringify,
): void => {
  if (value === null || value === undefined) {
    localStorage.removeItem(key)
  } else {
    localStorage.setItem(key, serialize(value))
  }
}

export const numberProps = {
  decimalScale: 2,
  decimalSeparator: ".",
  thousandSeparator: ",",
}

export const formatNumber = (num: string | number): string => {
  num = (
    Math.floor((+num + Number.EPSILON) * 10 ** numberProps.decimalScale) /
    10 ** numberProps.decimalScale
  ).toString()
  let [integer, decimal = "00"] = num
    .toString()
    .split(numberProps.decimalSeparator)

  integer = integer
    .split("")
    .reverse()
    .map((digit, index, arr) => {
      if (index % 3 === 2 && ![undefined, "-"].includes(arr[index + 1])) {
        return numberProps.thousandSeparator + digit
      }

      return digit
    })
    .reverse()
    .join("")

  return `${integer}${numberProps.decimalSeparator}${decimal}`
}

export const makeInitials = (name?: string | null) => {
  if (!name) {
    return ""
  }

  return name.split(" ").map((part) => part[0].toUpperCase())
}
