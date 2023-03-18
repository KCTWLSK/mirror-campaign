export const serializeProps = (props) => {
  for (const key in props) props[key] = JSON.stringify(props[key]);
  return props;
};

export const deserializeProps = (props) => {
  for (const key in props) props[key] = JSON.parse(props[key]);
  return props;
};