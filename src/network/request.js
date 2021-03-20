import axios  from 'axios'

// 请求配置
export function request(config) {
    // 生成请求实例
    const instance = axios.create({
        baseURL: 'http://127.0.0.1',
        timeout: 5000
    })

    // 配置请求拦截器
    instance.interceptors.request.use(config => {
        config.headers = {
            Authorization: localStorage.getItem('token')
        }
        return config
    },err => {
		console.log(err);
	})

    // 配置响应拦截器
    instance.interceptors.response.use(res => {
		return res.data
	},err => {
		console.log(err);
	})

    return instance(config)
}