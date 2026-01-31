export interface RadioOption<T extends string> {
  label: string
  value: T
}

interface RadioProps<T extends string> {
  title?: string
  options: RadioOption<T>[]
  value: T
  onChange: (value: T) => void
}

export function Radio<T extends string>(props: RadioProps<T>) {
  return (
    <fieldset>
      {props.title ? <legend>{props.title}</legend> : null}
      {props.options.map((it) => (
        <label key={it.value}>
          <input
            type="radio"
            checked={props.value === it.value}
            onChange={() => props.onChange(it.value)}
          />
          {it.label}
        </label>
      ))}
    </fieldset>
  )
}
