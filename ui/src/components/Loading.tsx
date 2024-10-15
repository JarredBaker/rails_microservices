import React from "react";
import {BounceLoader} from "react-spinners";

interface LoadingProps {
  children: React.ReactNode;
  loading: boolean;
  name: string;
}

const Loading: React.FC<LoadingProps> = ({children, loading, name}) => {

  return (
    <>
      {loading ? (
          <div className={"w-full min-h-s-less-header bg-white flex flex-col justify-center items-center pb-14"}>
            <BounceLoader
              color="#7dd3fc"
              loading
              size={80}
              speedMultiplier={1}
            />
            <p>Loading {name}</p>
          </div>
        ) : (
          children
        )}
    </>
  )
}

export default Loading;