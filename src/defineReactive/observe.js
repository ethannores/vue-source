import Observer from './Observer'

export default function observe(val) {
	//判断val是否为对象类型(包括obj，arr)
	if (typeof val != 'object') return
	let ob
	if (typeof val.__ob__ != 'undefined') {
		ob = val.__ob__
	} else {
		ob = new Observer(val)
	}
	return ob
}
