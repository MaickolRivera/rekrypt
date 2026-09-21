import { useEffect, useRef, useState } from "react";
import InputText from "../components/InputText";
import { axiosAPI } from "../api/axios";

interface RekryptProps {
  selectedMethods: string[];
}

function Rekrypt({ selectedMethods }: RekryptProps) {
  const [inputValue, setInputValue] = useState("Type here to enkrypt");
  const [ouputValue, setOuputValue] = useState("");
  const typingRef = useRef<number | null>(null);

  const typeText = (text: string) => {
    if (typingRef.current) clearInterval(typingRef.current)

    setOuputValue("");
    let i = 0;

    typingRef.current = setInterval(()=> {
      if(i< text.length){
        setOuputValue(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingRef.current!);
      }
    }, 15)
  } 

  useEffect(() => {
    const encryptText = async () => {
      if (inputValue && selectedMethods.length > 0) {
        try {
          const response = await axiosAPI.post("/transform", {
            text: inputValue,
            methods: selectedMethods,
          });
          typeText(response.data.result);
        } catch (error) {
          console.log("Error encrypting text ", error);
          typeText("Error encrypting text");
        }
      } else {
        typeText("Select a method and type to enkrypt");
      }
    };

    encryptText();
  }, [inputValue, selectedMethods]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

    return(
        <section className="h-full w-full text-sm lg:text-sm
            flex flex-col py-24 gap-7 px-12 lg:px-10 lg:pr-0 lg:py-9">
            <div className="flex flex-col gap-2">
                <h1 className="font-medium text-base">Welcome to Rekrypt</h1>
                <p className="text-pretty text-subtext">
                A text encryption tool that allows users to input text and apply
                multiple encryption algorithms in a specified order. Users can choose
                from various hashing algorithms (such as SHA-256, MD5, etc.)
                and combine them sequentially to generate an unique encrypted outputs.
                </p>
            </div>
            <div className="flex flex-col gap-8 h-full">
                <InputText
                    label="INPUT"
                    value={inputValue}
                    placeholder="Type here to enkrypt"
                    onChange={handleChange}
                ></InputText>
                <InputText
                    label="OUTPUT"
                    value={ouputValue}
                    placeholder="Waiting..."
                    readOnly
                    copyable
                ></InputText>
            </div>
        </section>
    )
}
export default Rekrypt;