import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import { ProjectsProvider } from '../context/ProjectProvider';

const gtPressuraMono = localFont({
    src: '../public/fonts/GT Pressura Mono Bold Bold.woff',
    variable: '--font-gt-pressura-mono'
})
 
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ProjectsProvider>
            <main className={`${gtPressuraMono.className} font-mono`}>
                <Component {...pageProps} />
            </main>
        </ProjectsProvider>
    )
}