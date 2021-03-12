import React, { useState } from 'react';

type Props = {
    actualSection: number
    sections: any[]
}
const SectionSelector = (props: Props) => {
    return props.sections[props.actualSection]
};

export default SectionSelector;