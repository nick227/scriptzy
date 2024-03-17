
import DB from "../../db/DB.js";

async function login(req, res) {
    const email = getEmail(req.body);
    try {
        const db = new DB('users.db');
        const query = { email: email };
        let user = await db.findOne(query);
        req.session.user = user;

        if (!user) {
            user = await db.insert({
                email: email,
            });
        }

        res.json({ message: 'Successfully authenticated' });
    } catch (error) {
        res.error('Failed to authenticate user:', error);
        return cb(error);
    }



    function getEmail(response) {
        if (!response || !response.credential) {
            console.error('Bad response from Google One Tap:', response);
            return;
        }
        var idTokenPayload;
        try {
            idTokenPayload = parseJwt(response.credential);
        } catch (error) {
            console.error('Failed to parse ID token:', error);
            return;
        }
        if (!idTokenPayload || !idTokenPayload.email) {
            console.error('No email address in ID token payload:', idTokenPayload);
            return;
        }
    
        return idTokenPayload.email;
    }
    
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

}

export default login;