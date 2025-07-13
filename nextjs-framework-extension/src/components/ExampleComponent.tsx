import React from 'react';

interface ExampleComponentProps {
    title?: string;
    description?: string;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ title = "Default Title", description = "Default Description" }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
};

export default ExampleComponent;