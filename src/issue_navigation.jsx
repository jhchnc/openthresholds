import { Component } from 'react'


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

function NavLink({spreads, page, issue_slug, page_slug}) {
    return (
        <a onClick={() => {
            const position = getCurrentPostion(page_slug, spreads)
            const left = position * 100
            document.getElementsByClassName("spreads")[0].style.left = "-" + left + "%"

            // manage the thumbAddClass relationship
            const thumbnails = document.getElementsByClassName("nav-item")
            let i = 0
            while (i < thumbnails.length) {
                let thumbnail = thumbnails[i]
                thumbnail.className = 'nav-item'
                i++
            }
            if (page.thumbAddClass != undefined && page.thumbAddClass[0] != undefined) {
                console.log(page.thumbAddClass)
                page.thumbAddClass.forEach((t) => {
                    let target = document.getElementById("nav-item-" + t.target)
                    target.classList.add(t.className)
                })
            }
            
        }}>
            {!page["thumbnail"] &&
                <>
                    {page["title"]}<br />
                </>
            }
            {page["thumbnail"] &&
                <img 
                    src={"/issues/" + issue_slug + "/" + page["thumbnail"]} 
                    alt={page["title"]} 
                />
            }
        </a>
    )
}

export default class IssueNavigation extends Component {
    render() {
        if (!this.props.spreads) return <></>
        return (
            <>
                <nav id="pages-menu" className="navbar navbar-expand">
                    <ul className="navbar-nav mr-auto">
                        {this.props.spreads.map((page, i) => {
                            return (
                                <li key={i} className="nav-item" id={"nav-item-" + page.slug}>
                                    <NavLink 
                                        spreads={this.props.spreads}
                                        page={page} 
                                        issue_slug={this.props.issue_slug} 
                                        page_slug={page.slug} 
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </>
        )   
    }
}
