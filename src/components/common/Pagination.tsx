import React, {useState} from "react";

export function Pagination({title, count, currentPage, setCurrentPage}: {
    title: string,
    count: number,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}) {
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

    return (
        <>
            <div className="flex items-center justify-between">
                <p className="py-2 text-2xl font-semibold text-Neutral-Strong">{count} {title}s</p>
                <div className="flex items-center justify-center py-2 align-middle text-lg">
                    <input
                        id="jump"
                        className="mx-2 w-16 rounded-md border border-gray-300 p-1 text-center align-middle font-semibold text-Neutral focus:outline-0"
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
                    <button className="rounded-md p-1 font-semibold text-white bg-Neutral-Mild hover:bg-Neutral"
                            onClick={() => {
                                if (jumpTo !== "")
                                    setCurrentPage(jumpTo)
                            }}>Jump
                    </button>
                </div>

            </div>

            <div className="flex items-center justify-end rounded-md bg-gray-200 text-lg font-semibold text-Neutral">
                <span className="pr-3 text-xl font-semibold">Page:</span>


                {renderPageButtons()}

            </div>
        </>
    )
}