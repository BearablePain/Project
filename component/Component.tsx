import React, { useState } from 'react';

export const Component = () => {
const [count, setCount] = useState<number>(0)

    const increment = () => {
    setCount(prevState => prevState +=1 )
    }

    return (
        <div>
<button onClick={increment}>++</button>{count}
        </div>
    );
};

