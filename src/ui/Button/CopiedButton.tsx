'use client'

import { cn } from "@/src/shared/lib/cn";
import { useClipboard } from "@/src/shared/hooks/useClipboard";
import Button from "@/src/ui/Button";

import { FaCheck } from 'react-icons/fa';
import { IoIosCopy } from "react-icons/io";

const CopiedButton = ({ textToCopy }: { textToCopy: string }) => {
    const { copied, copy } = useClipboard(textToCopy);

    const handleCopy = () => {
      void copy();
    };

    return (
        <Button onClick={handleCopy} isDisabled={copied}>
            <span className="copiedIcon">
                <FaCheck className={cn('text-green-500', 'icon', 'tick', copied && 'tickAnimation')} size={16} />
                <IoIosCopy className={cn('text-gray-600', 'icon', 'default', copied && 'tickAnimationReverse')} size={16} />
            </span>
            Copy Email
        </Button>
    )
}

export default CopiedButton
