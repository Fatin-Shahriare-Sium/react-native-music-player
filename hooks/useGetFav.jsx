import AsyncStorage from "@react-native-async-storage/async-storage"

let useGetFav=async()=>{
    let res=await AsyncStorage.getItem("favArray")
    console.log("useIsFav",res);
    return JSON.parse(res);
    
}
export default useGetFav;