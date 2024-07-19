import { Component } from 'react'


function getCurrentPostion(page_slug, spreads) {
    console.log(spreads)
    console.log(page_slug)
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
                                <li key={i} className="nav-item">
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
