import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={3}
        width={280}
        height={464.75}
        viewBox="0 0 280 464"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="130" cy="140" r="110" />
        <rect x="30" y="275" rx="10" ry="10" width="220" height="25" />
        <rect x="0" y="320" rx="10" ry="10" width="280" height="90" />
        <rect x="0" y="433" rx="10" ry="10" width="125" height="24" />
        <rect x="145" y="424" rx="20" ry="20" width="135" height="40" />
    </ContentLoader>
)

export default Skeleton

