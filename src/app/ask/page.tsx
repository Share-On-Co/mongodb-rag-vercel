'use client';

import { Message as MessageProps, useChat } from "ai/react";
import { useCallback, useEffect, useRef, useState } from 'react';
import NavBar from '../component/navbar';
import Form from '@/components/form';
import { INITIAL_QUESTIONS } from '@/utils/const';
import cx from '@/utils/cx';
import Message from "@/components/message";
import MessageLoading from "@/components/message-loading";


export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat({
    onResponse: () => {
      setStreaming(false);
    },
  });
  const [streaming, setStreaming] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const onClickQuestion = (value: string) => {
    setInput(value);
    setTimeout(() => {
      formRef.current?.dispatchEvent(
        new Event("submit", {
          cancelable: true,
          bubbles: true,
        }),
      );
    }, 1);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e);
      setStreaming(true);
    },
    [handleSubmit],
  );

  return (
    <main className="relative max-w-screen-md p-4 md:p-6 mx-auto flex min-h-svh !pb-32 md:!pb-40 overflow-y-auto ">
      {/* <NavBar /> */}
      <div className="w-full">

        {messages.map((message: MessageProps) => {
          return <Message key={message.id} {...message} />;
        })}
        
        {/* loading */}
        {streaming && <MessageLoading />}



        <>
          {messages.length == 0 &&
            (
              <div className="mt-4 md:mt-6 grid md:grid-cols-2 gap-2 md:gap-4">
              {INITIAL_QUESTIONS.map((message) => {
                return (
                  <button
                    key={message.content}
                    type="button"
                    className="cursor-pointer select-none text-left bg-white font-normal
                    border border-gray-200 rounded-xl p-3 md:px-4 md:py-3
                    hover:bg-zinc-50 hover:border-zinc-400"
                    onClick={() => onClickQuestion(message.content)}
                  >
                    {message.content}
                  </button>
                );
              })}
            </div>
            )
          }
        </>

        <div
        className={cx(
          "fixed z-10 bottom-0 inset-x-0",
          "flex justify-center items-center",
          "bg-white",
        )}
      >
        <span
          className="absolute bottom-full h-10 inset-x-0 from-white/0
         bg-gradient-to-b to-white pointer-events-none"
        />

        <div className="w-full max-w-screen-md rounded-xl px-4 md:px-5 py-6">
          <Form
            ref={formRef}
            onSubmit={onSubmit}
            inputProps={{
              disabled: streaming,
              value: input,
              onChange: handleInputChange,
            }}
            buttonProps={{
              disabled: streaming,
            }}
          />

        </div>
      </div>
      </div>
    </main>
);
}
