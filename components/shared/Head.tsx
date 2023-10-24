export default function Heading({
    title,
    description,
                                }:{
    title: string,
    description: string,
}){
    return (
        <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-md text-muted-foreground mt-2">{description}</p>
        </div>
    )
}