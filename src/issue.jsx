import { Component, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import IssueNavigation from './issue_navigation'
import 'bootstrap-icons/font/bootstrap-icons.scss'
import Scrollbar from 'smooth-scrollbar'


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

class Spread extends Component {
    render() {
        return (
            <div data-scrollbar className="spread">
                <div className="header">
                    <h3>
                        {this.props.title}<br/> 
                        <small>{this.props.author}</small>
                    </h3>
                </div>
                {this.props.page_left != null && 
                    <div className={"page page-left"}>
                        <Page 
                            file={this.props.page_left} 
                            slug={this.props.slug}
                        />
                    </div>
                }
                {this.props.page_right != null && 
                    <div className="page page-right">
                        <Page 
                            file={this.props.page_right} 
                            slug={this.props.slug}
                        />
                    </div>
                }
            </div>
        )            
    }
}

class Contents extends Component {
    componentDidMount() {
        const ws = window.innerWidth
        const wh = window.innerHeight
        const spreads = document.getElementsByClassName("spread")
        let i = 0
        while (i < spreads.length) {
            let spread = spreads[i]
            spread.style.width = ws + "px"
            spread.style.height = wh + "px"
            i++
        }

        // Scrollbar.initAll()
    }

    render() {
        const props = this.props
        const issue = props.table_of_contents["issues"].filter(issue => issue["slug"] == props.slug)

        if (!issue) return <></>
    
        const title = issue[0]["title"]
        const spreads = issue[0]["articles"]
        const navigation = issue[0]["navigation"]
        return (
            <>
                <div className="turn-pages">
                    <a className="bi bi-chevron-left" onClick={() => {
                        const current_left = document.getElementsByClassName("spreads")[0].style.left
                            ? document.getElementsByClassName("spreads")[0].style.left
                            : 0
                        let left = parseInt(current_left) + 50
                        if (parseInt(current_left) == 0) {
                            left = -((spreads.length-1) * 100) - 50
                        }
                        document.getElementsByClassName("spreads")[0].style.left = left + "%"
                    }}></a>
                    <a className="bi bi-chevron-right" onClick={() => {
                        const current_left = document.getElementsByClassName("spreads")[0].style.left
                            ? document.getElementsByClassName("spreads")[0].style.left
                            : 0
                        let left = parseInt(current_left) - 50
                        if (parseInt(current_left) < -((spreads.length-1) * 100)) {
                            left = 0
                        }
                        document.getElementsByClassName("spreads")[0].style.left = left + "%"
                    }}></a>
                </div>

                <div className="spreads">
                    {spreads.map((page, i) => {
                        const page_left = page.left == null ? null : page.left.file
                        const page_right = page.right == null ? null : page.right.file
                        return (
                            <div key={i} className="spread-container" id={"spread-" + page.slug}>
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
                <IssueNavigation navigation={navigation} spreads={spreads} issue_slug={props.slug} />
            </>
        )   
    }
}

export default function Issue(props) {
    const { slug } = useParams()
    let table_of_contents = undefined

    if (!props.table_of_contents) {
        table_of_contents = props.GetYaml()
        return <>Loading Issue, please wait.</>
    }
    else {
        table_of_contents = props.table_of_contents
    }

	return (
        <Contents slug={slug} table_of_contents={table_of_contents} />
	)
}
