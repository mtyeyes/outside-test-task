type ConditionalClassNameAttributes = {
  staticClassName?: string;
  conditionalClassNames: {
    [key: string]: boolean;
  };
};

const conditionalClassName = ({ staticClassName, conditionalClassNames }: ConditionalClassNameAttributes) => {
  if (staticClassName === undefined) {
    staticClassName = '';
  }

  const resultingClassName = Object.entries(conditionalClassNames).reduce((acc, [className, conditional]) => {
    if (conditional === true && className !== '') {
      return `${acc} ${className}`;
    } else {
      return acc;
    }
  }, staticClassName);

  if (resultingClassName === '') {
    return undefined;
  }

  return resultingClassName;
};

export default conditionalClassName;
