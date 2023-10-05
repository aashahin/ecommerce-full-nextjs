export default function Heading({
    title,
    description,
                                }:{
    title: string,
    description: string,
}){
    return (
        <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
        </div>
    )
}