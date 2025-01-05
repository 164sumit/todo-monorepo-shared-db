import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { auth } from './auth';


// import { loadSensors } from './actions/sensor.action';


export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    // loadSensors().catch(err => console.error('Failed to load sensors on startup:', err));
    // console.log("salt: ",process.env.AUTH_SALT);
    //     const rawToken = await getToken({ reqL:request, raw: true })
    //   console.log(rawToken)
    const session = await auth()
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET!,
        // Ensure this matches the name of the secure cookie used in production
        
        salt: process.env.AUTH_SALT || 'authjs.session-token',
        
    });
    console.log("sess",session);
    if(pathname=='/auth'){
        if(session){
        return NextResponse.redirect(new URL('/', request.url));

        }
        else{

            return NextResponse.next();
        }
    }
    if(!session){
        return NextResponse.redirect(new URL('/auth', request.url));
    }
    return NextResponse.next();
        
        
   
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};