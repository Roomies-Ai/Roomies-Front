import robotIcon from '../../../../assets/svg/robot.svg';

const LoginHeader: React.FC = () => {
    return (
        <div className="relative w-full h-[320px] md:h-[280px] lg:h-[320px] shrink-0">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(99, 166, 233, 0) 0%, rgba(17, 25, 33, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAU1FMW2WFtg3oEy6rzaewAGguApo22msUc5uWhLIrXrGhwDassLDasjUGQX_7A5g7HS_r6HRw-qd4ZgwhJT5qSMvFRLbA3gHuyQuwQSzMGwre1_VLNOpLOdMRjkyFD1XRQqjmvmj_C8zOW7QUytiiGUiOgBlu0qe4qP3ZL4jSJUdrWQC_84EDeNjLRI02wYEtayggB6CEiIfKYIzkfznG5vcmw4StzUUMwwwRzyWI1jWnPJYY-QGl6PlOqKusX7yAfs4f6NxydWI")`
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
            <div className="absolute bottom-10 left-0 right-0 p-6 flex flex-col justify-end h-full">
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm">
                        <img src={robotIcon} alt="Robot Icon" className="w-8 h-8" />
                    </div>
                    <h1 className="!text-white text-3xl font-extrabold tracking-tight drop-shadow-md">Roomies</h1>
                </div>
                <p className="!text-white/90 text-lg font-medium leading-tight max-w-[80%] drop-shadow-sm">Let's get organized together.</p>
            </div>
        </div>
    );
};

export default LoginHeader;
