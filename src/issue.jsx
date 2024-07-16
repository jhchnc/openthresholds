import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'


const Spread = (props) => {
    return (
        <div className="spread">
            {props.page_left != null && 
                <div className="page page-left">
                    <Page 
                        file={props.page_left} 
                        slug={props.slug}
                    />
                </div>
            }
            {props.page_right != null && 
                <div className="page page-right">
                    <Page 
                        file={props.page_right} 
                        slug={props.slug}
                    />
                </div>
            }
        </div>
    )
}

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
        <div>{parse(page_html)}</div>
    </>
}

const Contents = (props) => {
    const issue = props.table_of_contents["issues"].filter(issue => issue["slug"] == props.slug)

    if (!issue) return <></>

    const title = issue[0]["title"]
    const spreads = issue[0]["articles"]
	return (
		<div>
            <h1>{props.table_of_contents["title"]}</h1>
            <h2>{title}</h2>
            <div className="spreads">
                {spreads.map((page, i) => {
                    const page_left = page.left == null ? null : page.left.file
                    const page_right = page.right == null ? null : page.right.file
                    return (
                        <div key={i} className="spread-container" id={"spread-" + page.file}>
                            <div class="header">
                            <h3>{page.title} <br/> 
                            <small>{page.author}</small>
                            </h3>
                            </div>
                            <Spread
                                slug={props.slug} 
                                title={page.title} 
                                author={page.author}
                                page_left={page_left}
                                page_right={page_right}
                            />
                        </div>
                    )
                })}			
            </div>
			<ul id="pages-menu">
				{spreads.map((page, i) => {
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
