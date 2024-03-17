import React, {useState} from "react";

export function Pagination({title,count,currentPage,setCurrentPage}:{title:string,count:number,currentPage:number,setCurrentPage: React.Dispatch<React.SetStateAction<number>>}){
    const [jumpTo, setJumpTo] = useState<number | "">(1)
    const pagination = 10
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        let totalPages = Math.floor(count / pagination);
        totalPages += count % pagination === 0 ? 0 : 1;
        const MaximumShown = 5;

        // Calculate the start page to ensure the current page is centered
        let startPage = currentPage - Math.floor(MaximumShown / 2);
        startPage = Math.max(startPage, 1);
        startPage = Math.min(startPage, Math.abs(totalPages - MaximumShown) + 1);
        let endPage = startPage + MaximumShown - 1
        endPage = Math.min(endPage, totalPages)

        const pagesToShow = [];
        for (let i = startPage; i <= endPage; i++) {
            pagesToShow.push(i);
        }

        return pagesToShow.map((page) => (
            <button
                className={`hover:bg-gray-300 py-1 rounded-md px-4 ${currentPage === page && "bg-gray-300"}`}
                key={page} onClick={() => handlePageClick(page)}>
                {page}
            </button>
        ));
    };

    return(
        <>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-Neutral-Strong py-2 text-2xl">{count} {title}s</p>
                <div className="flex justify-center items-center align-middle py-2 text-lg">
                    <input
                        id="jump"
                        className="border rounded-md border-gray-300 mx-2 p-1 text-Neutral text-center font-semibold align-middle w-16 focus:outline-0"
                        type="text"
                        value={jumpTo}
                        onChange={(e) => {
                            if (e.target.value === "") {
                                setJumpTo(e.target.value)
                                return
                            }
                            const value = parseInt(e.target.value);
                            if (value && value <= (count / pagination) + 1) setJumpTo(value)
                        }}
                    />
                    <button className="bg-Neutral-Mild hover:bg-Neutral text-white font-semibold p-1 rounded-md"
                            onClick={() => {
                                if (jumpTo !== "")
                                    setCurrentPage(jumpTo)
                            }}>Jump
                    </button>
                </div>

            </div>

            <div className="flex justify-end items-center bg-gray-200 rounded-md text-lg font-semibold text-Neutral">
                <span className="text-xl font-semibold pr-3">Page:</span>


                {renderPageButtons()}

            </div>
        </>
    )
}