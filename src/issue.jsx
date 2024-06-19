import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'


const Page = (props) => {
    const [page_html, setPageHtml] = useState("")
	const [isLoading, setLoading] = useState(true)
	
	const url = `/issues/` + props.slug + `/` + props.file
	useEffect(() => {
		fetch(url)
			.then((res) => res.text())
			.then((data) => {
				setPageHtml(data)
				setLoading(false)
			})
	}, [])

	if (isLoading) return <>Loading...</>
	return <>
        <h3>{props.title}</h3>
        <h5>{props.author}</h5>
        <div>{parse(page_html)}</div>
    </>

}

const Contents = (props) => {
    const issue = props.table_of_contents["issues"].filter(issue => issue["slug"] == props.slug)

    if (!issue) return <></>

    const issue_title = issue[0]["title"]
    const issue_pages = issue[0]["pages"]
	return (
		<div>
            <h1>{props.table_of_contents["title"]}</h1>
            <h2>{issue_title}</h2>
            <div id="pages">
                {issue_pages.map((page, i) => {
                    return (
                        <div key={i} className="page" id={"page-" + page.file}>
                            <Page 
                                slug={props.slug} 
                                file={page.file} 
                                title={page.title} 
                                author={page.author}
                            />
                        </div>
                    )
                })}			
            </div>

			<ul id="pages-menu">
				{issue_pages.map((page, i) => {
					return (
						<li key={i}>
                            <a href="#">
                                {page["title"]}<br />
                                {page["thumbnail"] &&
                                    <img src={"/issues/" + issue[0]["slug"] + "/" + page["thumbnail"]} alt={page["title"]} />
                                }
                            </a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

function goToPage(file) {
    return false
}

export default function Issue(props) {
    const { slug } = useParams()
    let table_of_contents = undefined
    console.log(props)

    if (!props.table_of_contents) {
        table_of_contents = props.GetYaml()
        return <>Loading Issue, please wait.</>
    }
    else {
        table_of_contents = props.table_of_contents
    }

	return (
		<div>
			<Contents slug={slug} table_of_contents={table_of_contents} />
		</div>
	)
}
