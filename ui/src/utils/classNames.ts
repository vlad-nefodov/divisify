type Value = string | boolean | undefined | null;
type Mapping = Record<string, unknown>;
type ArgumentArray = Array<Argument>;
type ReadonlyArgumentArray = ReadonlyArray<Argument>;
type Argument = Value | Mapping | ArgumentArray | ReadonlyArgumentArray;

const hasOwn = {}.hasOwnProperty;

export default function classNames(...args: ArgumentArray): string {
  let classes = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg !== null && arg !== undefined) {
      classes = appendClass(classes, parseValue(arg));
    }
  }

  return classes;
}

function parseValue(arg: Argument): string {
  if (typeof arg === 'string') {
    return arg;
  }

  if (Array.isArray(arg)) {
    return classNames(...arg);
  }

  if (typeof arg === 'object' && arg !== null) {
    let classes = '';

    const obj = arg as Mapping;
    for (const key in obj) {
      if (hasOwn.call(obj, key) && obj[key]) {
        classes = appendClass(classes, key);
      }
    }

    return classes;
  }
  return '';
}

function appendClass(value: string, newClass: string): string {
  if (!newClass) {
    return value;
  }
  return value ? value + ' ' + newClass : newClass;
}
