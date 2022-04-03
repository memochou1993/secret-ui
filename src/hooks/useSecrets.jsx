import { useState } from 'react';

const useSecrets = (value = []) => {
  const [secrets, setSecrets] = useState(value);
  return [secrets, setSecrets];
};

export default useSecrets;
