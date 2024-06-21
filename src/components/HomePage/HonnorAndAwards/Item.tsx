import React from 'react';

import { ExperiencePeriod } from '../Experience/expreience.types';

import Surface from '@/src/core/components/Surface';
import Text from '@/src/core/components/Text';
import Link from 'next/link';

import { BiLinkExternal } from "react-icons/bi";


const Item = ({ data }: any) => {
    const { company, website, skills, location, working_type, periods, } = data;
    
    return (
        <Surface customClassname={['flex', 'flex-col', 'gap-6']}>
            <div className="flex flex-row z-[2]">
                <div className="flex-auto">
                    <h4> {company} - {periods[0].title} </h4>
                    <Text fontSize='sm'><b>Skills:</b> {skills.join(" · ")} </Text>
                </div>
                <div className="flex items-center h-100 flex-initial">
                    <Link href={website} target='_blank' className='cursor-pointer p-2 rounded-full shadow-md'><BiLinkExternal size={16} /></Link>
                </div>
            </div>
            {/* {location} */}

            {
                periods.length > 1 && (
                    <ul className='periods'>
                    {periods.map(
                        ({
                            title,
                            employment_type,
                            start_date,
                            end_date,
                            desc,
                        }: ExperiencePeriod) => (
                            <li key={'expP_' + title} className='flex justify-between items-center'>
                                <span>{title} - {employment_type}</span> <span>{start_date} {end_date}</span>
                            </li>
                        )
                    )}
                </ul>
                )

            }

        </Surface>
    )
}

export default Item