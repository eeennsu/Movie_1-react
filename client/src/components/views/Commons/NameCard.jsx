import React, { memo } from 'react';

const NameCard = memo(({ name }) => {
    console.log('안보임 ! ' + name);
    return (
        <div>
            
        </div>
    );
});

export default NameCard;