import type { EducationContent } from "@/src/features/portfolio/types";
import { formatDateRange } from "@/src/shared/lib/date";
import Section, { Headline } from "@/src/ui/Section";
import Surface from "@/src/ui/Surface";
import Text from "@/src/ui/Text";

interface EducationProps {
    education: EducationContent;
}

const Education = ({ education }: EducationProps) => {
    const { name, department, grade, startDate, endDate, certificates } = education;
    return (
        <Section id="education" customClassname={['flex flex-col gap-4']}>
            <Headline>
                <Text tag="h3">Education</Text>
            </Headline>
            <Surface inOrder>
                <div className="row">
                    <Text tag="h4">{name}</Text>
                    <Text fontSize="sm">{formatDateRange(startDate, endDate, "year")}</Text>
                </div>
                <div className="row">
                    <Text fontSize="sm">{department} - {grade}</Text>
                </div>
            </Surface>
            <Surface inOrder customClassname={['flex flex-col gap-6']}>
                {certificates.map((obj, i) => {
                    const { title, period } = obj;

                    return (
                        <div key={'p_' + i} className="flex flex-col gap-3" >
                            <Text tag="h4" fontSize="md">{title}</Text>
                            <ul className="flex flex-col gap-2 ml-3 pl-3">
                                {period.map((e, i) => <li key={'p2_' + i} className="d-block">
                                    <Text fontSize="sm">{e}</Text>
                                </li>)}
                            </ul>
                        </div>)
                })
                }

            </Surface>
        </Section>
    );
};

export default Education;
