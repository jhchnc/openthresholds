import { Component, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import IssueNavigation from './issue_navigation'
import 'bootstrap-icons/font/bootstrap-icons.scss'


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

class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0,
            isSplitScreen: false,
            splitScreenDirection: null,
            previousPosition: null,
        };

        // Create an array of slugs in the order they appear in articles
        this.articleOrder = this.props.table_of_contents.issues
            .find(issue => issue.slug === this.props.slug)
            .articles.map(article => article.slug);

        // Add this to handle initial hash
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const position = this.articleOrder.indexOf(hash);
            if (position !== -1) {
                this.state.currentPosition = position;
            }
        }
    }

    componentDidMount() {
        const ws = window.innerWidth;
        const wh = window.innerHeight;
        const spread_collection = document.getElementsByClassName("spread");
        for (let spread of spread_collection) {
            spread.style.width = ws + "px";
            spread.style.height = wh + "px";
        }

        this.updateSpreadPosition();
        window.addEventListener('hashchange', this.handleHashChange);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    handleHashChange = () => {
        const hash = window.location.hash.replace('#', '');
        const position = this.articleOrder.indexOf(hash);
        if (position !== -1 && position !== this.state.currentPosition) {
            this.setState({ currentPosition: position }, () => {
                this.updateSpreadPosition();
            });
        }
    }

    updateSpreadPosition = () => {
        const position = this.state.currentPosition;
        const slug = this.getCurrentSlug();
        
        document.getElementsByClassName("spreads")[0].style.left = "-" + (position * 100) + "%";
        
        // Update navigation active state
        const thumbnails = document.getElementsByClassName("nav-item");
        for (let thumbnail of thumbnails) {
            thumbnail.classList.remove('active');
        }
        const navItem = document.getElementById("nav-item-" + slug);
        if (navItem) {
            navItem.classList.add('active');
        }

        // Update URL hash without triggering navigation
        if (window.location.hash !== `#${slug}`) {
            window.history.replaceState(null, null, `#${slug}`);
        }
    }

    updateActiveNavItem() {
        const thumbnails = document.getElementsByClassName("nav-item");
        for (let thumbnail of thumbnails) {
            thumbnail.classList.remove('active');
        }
        const activeNavItem = document.getElementById("nav-item-" + this.getCurrentSlug());
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }

    getCurrentSlug() {
        return this.articleOrder[this.state.currentPosition];
    }

    navigatePage(direction) {
        if (this.state.isSplitScreen) {
            if (direction === this.state.splitScreenDirection) {
                // Complete the navigation
                let newIndex = direction === 'next' 
                    ? (this.state.currentPosition + 1) % this.articleOrder.length
                    : (this.state.currentPosition - 1 + this.articleOrder.length) % this.articleOrder.length;
                
                this.setState({ 
                    currentPosition: newIndex, 
                    isSplitScreen: false, 
                    splitScreenDirection: null,
                    previousPosition: null
                }, () => {
                    this.updateSpreadPosition();
                });
            } else {
                // Go back to the original page
                this.setState({ 
                    currentPosition: this.state.previousPosition, 
                    isSplitScreen: false, 
                    splitScreenDirection: null,
                    previousPosition: null
                }, () => {
                    this.updateSpreadPosition();
                });
            }
        } else {
            // Enter split-screen mode
            this.setState({ 
                isSplitScreen: true, 
                splitScreenDirection: direction,
                previousPosition: this.state.currentPosition
            }, () => {
                // Calculate split screen position
                const position = this.state.currentPosition;
                const offset = direction === 'next' ? 50 : -50;
                document.getElementsByClassName("spreads")[0].style.left = `-${(position * 100) + offset}%`;
            });
        }
    }

    render() {
        const props = this.props;
        const issue = props.table_of_contents["issues"].find(issue => issue["slug"] === props.slug);

        if (!issue) return <></>;
    
        const spreads = issue["articles"];
        const navigation = props.navigation;

        return (
            <>

                <div className="turn-pages">
                    {this.state.currentPosition > 0 && 
                        <a className="bi bi-chevron-left" onClick={() => this.navigatePage('prev')}></a>
                    }
                    {this.state.currentPosition < this.articleOrder.length - 1 && 
                        <a className="bi bi-chevron-right" onClick={() => this.navigatePage('next')}></a>
                    }
                    <a href="https://paperology.openthresholds.org" id="home">about</a>

                </div>

                <div className="spreads">
                    {this.articleOrder.map((slug, i) => {
                        const page = spreads.find(spread => spread.slug === slug);
                        const page_left = page.left == null ? null : page.left.file;
                        const page_right = page.right == null ? null : page.right.file;
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
                        );
                    })}
                </div>
                <IssueNavigation 
                    navigation={navigation} 
                    spreads={spreads} 
                    issue_slug={props.slug} 
                    onNavigate={(position, isSplitScreen) => {
                        const newPosition = this.articleOrder.indexOf(navigation[position]);
                        this.setState({ 
                            currentPosition: newPosition, 
                            isSplitScreen, 
                            splitScreenDirection: null 
                        }, this.updateSpreadPosition);
                    }}
                />
            </>
        );   
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

    const issue = table_of_contents["issues"].find(issue => issue["slug"] === slug)
    if (!issue) return <>Issue not found.</>

    return (
        <Contents slug={slug} table_of_contents={table_of_contents} navigation={issue.navigation} 
        />
    )
}