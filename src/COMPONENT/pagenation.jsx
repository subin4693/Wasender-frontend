import React from "react";
import "../SCSS/pagenation.scss";

const pagenation = ({ totalPages, page, setPage }) => {
	console.log({ totalPages, page });
	if (totalPages <= 1) return <></>;
	let arr = [];
	for (let i = 1; i <= totalPages; i++) arr.push(i);
	return (
		<div className="pagination_container">
			{arr.map((val) => (
				<button
					key={val}
					onClick={() => setPage(val)}
					className={val == page ? "active" : ""}
				>
					{val}
				</button>
			))}
		</div>
	);
};

export default pagenation;
