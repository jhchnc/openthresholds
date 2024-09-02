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
                    <small><span className="from"><img src="/issues/paperology/from.png" /><br/>from {this.props.from}</span><span className="to"><img src="/issues/paperology/to.png" /><br/>to {this.props.to}</span></small>
       
                    <span className="title">{this.props.title}</span><br/>
                    <span className="author">{this.props.author}</span><br/>
                    <span className="location">{this.props.location}</span><br/>
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

function setActivePostion(left) {
    // if it's divisible by 50 it is a half page
    // so if's not, then determine the active nav-item and set it to active 
    if (Math.abs(left) % 100 == 0) {
        let current_nav = document.getElementsByClassName("nav-item active")[0]
        if (current_nav) {
            current_nav.classList.remove('active')
        }
        let position = Math.abs(left) / 100
        let link = document.getElementsByClassName("nav-item")[position]
        link.classList.add("active")
    }
} 

function getCurrentPostion(page_slug, spreads) {
    let positions = spreads.map((page, i) => {
        if (page.slug == page_slug) {
            return i
        }
        return null
    })
    let position = positions.filter((p, i) => {
        return p != null
    })
    return position[0]
} 

class Contents extends Component {
    componentDidMount() {
        const ws = window.innerWidth
        const wh = window.innerHeight
        const spread_collection = document.getElementsByClassName("spread")
        let i = 0
        while (i < spread_collection.length) {
            let spread = spread_collection[i]
            spread.style.width = ws + "px"
            spread.style.height = wh + "px"
            i++
        }

        // allow for a reloaded page
        // find the hashed position
        const issue = this.props.table_of_contents["issues"].filter(issue => issue["slug"] == this.props.slug)
        const spreads = issue[0]["articles"]
        let reloaded_slug = window.location.hash.replace("#","")
        const position = getCurrentPostion(reloaded_slug, spreads)
        // set a left value according to it's position x 100
        const left = position * 100
        document.getElementsByClassName("spreads")[0].style.left = "-" + left + "%"

        // set active trait on nav link
        let link = document.getElementsByClassName("nav-item")[position]
        // link.classList.add("active")

    }

    render() {
        const props = this.props
        const issue = props.table_of_contents["issues"].filter(issue => issue["slug"] == props.slug)

        if (!issue) return <></>
    
        const spreads = issue[0]["articles"]
        const navigation = issue[0]["navigation"]

        return (
            <>
                <div className="turn-pages">
                    <a className="bi bi-chevron-left" onClick={() => {
                        const current_left = document.getElementsByClassName("spreads")[0].style.left
                            ? parseInt(document.getElementsByClassName("spreads")[0].style.left)
                            : 0
                        let left = current_left + 50
                        if (current_left == 0) {
                            left = -((spreads.length-1) * 100) // - 50 // might need to restore this
                        }
                        document.getElementsByClassName("spreads")[0].style.left = left + "%"
                        setActivePostion(left)
                    }}></a>
                    <a className="bi bi-chevron-right" onClick={() => {
                        const current_left = document.getElementsByClassName("spreads")[0].style.left
                            ? parseInt(document.getElementsByClassName("spreads")[0].style.left)
                            : 0
                        let left = current_left - 50
                        if (current_left < -((spreads.length-1) * 100)) {
                            left = 0
                        }
                        // the _last_ slide -- might need to refactor this
                        if (current_left == -((spreads.length-1) * 100)) {
                            left = 0
                        }
                        document.getElementsByClassName("spreads")[0].style.left = left + "%"
                        setActivePostion(left)
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
                                    location={page.location} 
                                    author={page.author}
                                    from={page.from} 
                                    to={page.to} 
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
