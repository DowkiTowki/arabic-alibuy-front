import React, { Component } from "react";

class OfflineComponent extends Component {
	render() {
		return (
			<React.Fragment>
				<div style={{justifyContent: 'center',alignItems: 'center',flexDirection: 'column',height: '100vh',display: 'flex'}} >
					<div>
						<img style={{maxWidth: '10rem',height: 'auto',display: 'block',verticalAlign: 'middle'}}
							src="/assets/offline.png"
							alt={'شما آفلاین هستید'}
						/>
					</div>
					<h2 style={{fontWeight: 900,margin: '0.75rem 0'}}>شما آفلاین هستید!</h2>
					<h3 style={{margin: '0 0 2.5rem 0'}}>
						لطفا اتصال دستگاه به اینترنت را بررسی کنید.
					</h3>
				<button style={{width: '18rem',
                    '--btn-color': 'var(--p)',
                    '--tw-text-opacity': '1',
                    'color': 'var(--fallback-pc, oklch(var(--pc) / var(--tw-text-opacity)))',
                    outlineColor: 'var(--fallback-p, oklch(var(--p) / 1))',
                    display: 'inline-flex',
                    height: '3rem',
                    minHeight: '3rem',
                    flexShrink: '0',
                    cursor: 'pointer',
                    '-webkit-user-select': 'none',
                    userSelect: 'none',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--rounded-btn, 0.5rem)',
                    borderColor: 'transparent',
                    borderColor: 'oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity))',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    lineHeight: '1em',
                    gap: '0.5rem',
                    fontWeight: 600,
                    textDecorationLine: 'none',
                    transitionDuration: '200ms',
                    transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                    borderWidth: 'var(--border-btn, 1px)',
                    animation: 'button-pop var(--animation-btn, 0.25s) ease-out',
                    transitionProperty: 'color, background-color, border-color, opacity, box-shadow, transform',
                    '--tw-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    '--tw-shadow-colored': '0 1px 2px 0 var(--tw-shadow-color)',
                    boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
                    backgroundColor: 'oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity))',
                    '--tw-bg-opacity': '1',
                    '--tw-border-opacity': '1',
                    }} onClick={()=>{window.location.reload()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1.5rem',height: '1.5rem'}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    تلاش مجدد
                </button>
			</div>
		</React.Fragment>
		);
	}
}

export default OfflineComponent;
