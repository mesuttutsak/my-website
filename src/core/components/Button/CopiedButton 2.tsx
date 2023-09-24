'use client'

import React, { useLayoutEffect, useState } from 'react';

import Button from "@/src/core/components/Button";
import { copyText } from "@/src/core/utils/copyText";

import { FaCheck } from 'react-icons/fa';
import { IoIosCopy } from "react-icons/io";

const CopiedButton = () => {
    const [copied, setCopied] = useState('')

    useLayoutEffect(() => {
      if (copied !== '') {
        copyText(copied)
        setTimeout(() => {
          setCopied('');
        }, 2000);
      }
    }, [copied])

    return (
        <Button onClick={() => setCopied('ttsk.mesut@gmail.com')} isDisabled={copied !== ""}>
            <span className="copiedIcon">
                <FaCheck className={`text-green-500 icon tick ${copied !== "" && 'tickAnimation'}`} size={16} />
                <IoIosCopy className={`text-gray-600 icon default ${copied !== "" && 'tickAnimationReverse'}`} size={16} />
            </span>
            Copy Email
        </Button>
    )
}

export default CopiedButton