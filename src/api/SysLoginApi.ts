import {AxiosResponse, AxiosStatic} from "axios"
import Qs from "qs";
import CryptoJS from "crypto-js";
const MD5 = require('md5.js')

const url = {
    register: "/sysLogin/register",
    pyToolRegister: "/smallTool/sys/register",
    pyChangePassword: "/smallTool/sys/changePassword",
    login: "/etLogin/login",
    ssoLogin: "/sso-server/ssoLogin",
    logout: "/sysLogin/logout",
    gen: "/sysLogin/gen",
    check: "/sysLogin/check",
    isLogin: "/sso-server/isLogin",
}

const aesKey = CryptoJS.enc.Utf8.parse("jiannanchuntuand")
const AesIv = CryptoJS.enc.Utf8.parse("8145933630441549")

export interface RegisterData {
    username: string | undefined;
    password: string | undefined;
    nickname: string | undefined;
    phone: number | undefined;
    email: string | undefined;
}


export interface LoginData {
    username: string;
    password: string;
    redirect: string;
    hash: string;
    genId: string;
}

export interface App {
    id: string;
    appName: string;
    imgId: string;
    appUrl: string;
}

export default class SysLoginApi {

    public ajax: AxiosStatic

    constructor(public a: AxiosStatic) {
        this.ajax = a
    }


    public register(registerData: RegisterData): Promise<AxiosResponse> {
        return this.ajax({
            method: "post",
            url: url.register,
            data: Qs.stringify(({
                username: registerData.username,
                password: registerData.password,
                nickname: registerData.nickname,
                phone: registerData.phone,
                email: registerData.email,
            }))
        })
    }

    public login(loginData: LoginData): Promise<any> {
        loginData.password = new MD5().update(loginData.password).digest('hex');
        return this.ajax({
            method: "post",
            url: url.login,
            data: Qs.stringify(({
                username: loginData.username,
                password: loginData.password,
                genId: loginData.genId,
            }))
        }).then((res: AxiosResponse) => {
            const decrypt = CryptoJS.AES.decrypt(res.data.data, aesKey, {
                iv: AesIv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            });
            const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
            const data = JSON.parse(decryptedStr)
            return data
        })
    }

    public logout(): Promise<AxiosResponse> {
        return this.ajax({
            method: 'post',
            url: url.logout,
        })
    }

    public gen(): Promise<AxiosResponse> {
        return this.ajax({
            method: 'post',
            url: url.gen,
        })
    }

    public check(data: any): Promise<AxiosResponse> {
        return this.ajax({
            method: 'post',
            url: url.check,
            data: data
        })
    }

    public isLogin(): Promise<AxiosResponse> {
        return this.ajax({
            method: 'post',
            url: url.isLogin,
        })
    }
}
